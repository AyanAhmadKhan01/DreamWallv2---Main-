const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const { error, profile } = require('console');
const { console } = require('inspector');
const rateLimit = require('express-rate-limit');
const socketIo = require('socket.io');
const { type } = require('os');
const { types } = require('util');

const port = process.env.PORT || 4000;

const downloadLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 10, 
  message: 'Too many requests, please try again later.',
});

const likeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again later.',
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    
  
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); 
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({storage})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const app = express();
const corsOptions = {
  origin: 'https://dreamwallv2.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },  
  profileLogo: {type: String, default: '/img/dreamwall-logo.png'},
  profileBanner: {type: String, default: '/img/DreamWall-Banner.png'},
  profileAbout: {type: String, default: ''},
  profileUrl: {type: String, 
    default: () => `${Math.random().toString(36).substring(7)}` , unique: true},
  createdAt: {type: Date , default:Date.now},
  deleteAt: {type: Date, default: null},
});


const wallpaperSchema = new mongoose.Schema({
  wallpaperName: {  type: String, unique: true},
  imgLink: { type: String, default: ''},
  genre: { type: String, default: ''},
  downloads: {type: Number, default: 0  },
  likes: {type: Number, default: 0},
  likedBy: { type: [String] },
  comment: { type: String },
  linkCopy: {type: String,
    default: () => `${Math.floor(100000 + Math.random() * 900000)}`,
    unique: true},
  uploaderName: { type: String, default: ''},
  uploadDate: {type: Date, default:Date.now },
  resolution: {type: String, default: ''},
  tags: {type: [String]},
  deviceTags: {type: String, default: ''}
})

const commentSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.String, ref: 'User'},
  userLogo: {type: String, default: '/img/dreamwall-logo.png' },
  commentText: {type: String, required: true},
  createdAt: {type: Date , default:Date.now},
  commentId: {type: mongoose.Schema.Types.String, ref: 'Wallpaper'},
})

const leaderBoardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.String, ref: 'username' }, 
  profileLogo: { type: mongoose.Schema.Types.String, ref: 'ProfileLogo' },
  profileUrl: { type: mongoose.Schema.Types.String, ref: 'ProfileUrl' },
  downloads: { type: Number },    
  rank: { type: Number, default: 0, min: 1, max: 10 },  
});


const Leaderboard = mongoose.model('Leaderboard', leaderBoardSchema);


const Comment = mongoose.model('Comment', commentSchema)
const User = mongoose.model('User', userSchema);
const Wallpaper = mongoose.model('Wallpaper', wallpaperSchema);
Wallpaper.init();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(403).send({ message: 'Access Denied. No token Provided'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token.'});
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({email});
  if(existingUser) {
    return res.status(400).send({ message: 'Email Already Taken' });
  }

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({ username, email, password:hashedPassword });
await newUser.save();
res.status(201).send({ message: 'User Successfully Registered' });
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ message: 'User not found'});

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) return res.status(401).send({ message: 'Wrong Password' });

  const payload = { username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 365 * 24 * 60 * 60 * 1000, 
    sameSite: 'None', 
  });

  res.status(200).send({ message: 'Login Successful', token });
}

const getUserData = async (req, res) => {
  const username = req.user.username;
  const user = await User.findOne({username});

  if(!user) {
    return res.status(404).send({message: 'User Not found' });
  }
  res.status(200).send({
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    deleteAt: user.deleteAt,
  });
};


app.get('/api/user/profileMatch', async (req, res) => {
  try{
    const { username } = req.query;
    if(!username) {
      return res.status(400).json({ message: 'Profile not found'});
    }
    const user = await User.findOne({ username });

    if(!user) {
      return res.status(400).json({message: 'Profile Not Found'});
    }
    res.json({ profileUrl: user.profileUrl});
  } catch (err) {
    res.status(404).json({message: 'Failed to load profile'});
  }
});

app.get('/api/user/profile', async (req, res) => {
  try {
    const { profileUrl } = req.query; 
    if (!profileUrl) {
      return res.status(400).json({ message: 'Profile URL is required' });
    }

    const profile = await User.findOne({ profileUrl }).select('-email -password');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile); 
  } catch (err) {
    res.status(500).json({ message: 'Failed Loading Profile', error: err.message });
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post('/api/user/profile', async (req, res) => {
  const {profileUrl} = req.query;
  const {profileBanner, profileLogo, password } = req.body;
  try {
    const user = await User.findOne({ profileUrl: profileUrl });

    if (!profileUrl) {
      return res.status(400).json({ message: 'Wrong Profile Url' });
  }
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword || user.password;
    user.profileBanner = profileBanner || user.profileBanner;
    user.profileLogo = profileLogo || user.profileLogo;

    await user.save();
    return res.status(200).json({ message: 'Successfully Updated Profile' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to Update Profile', error: err.message });
  }
});


app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }
   
    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const {
      wallpaperName,
      genre,
      downloads,
      comment,
      likedBy,
      linkCopy,
      uploaderName,
      uploadDate,
      resolution,
      tags,
      deviceTags,
    } = req.body;

    const existingWallpaper = await Wallpaper.findOne({ wallpaperName });
    if (existingWallpaper) {
      return res.status(400).json({
        success: false,
        message: "Wallpaper already exists",
      });
    }

    const newWallpaper = new Wallpaper({
      wallpaperName,
      imgLink: result.secure_url, 
      genre,
      downloads,
      likedBy,
      comment,
      linkCopy,
      uploaderName,
      uploadDate,
      resolution,
      tags,
      deviceTags,
    });

    await newWallpaper.save();

    res.status(201).json({
      success: true,
      message: "Wallpaper uploaded successfully",
      data: newWallpaper,
    });
  } catch (err) {
    console.error("Error handling upload:", err);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.message,
    });
  }
});


app.get('/api/wallpaper/display', async (req, res) => {
  try {
    const showWallpaper = await Wallpaper.find();
    res.json(showWallpaper);
  } catch (err) {
    res.status(500).json({message: 'Error Loading Wallpaper', err})
  }
})

app.get('/api/wallpaper/view', async (req, res) => {
  try {
    const {linkCopy}  = req.query;
    if(!linkCopy) {
      return res.status(400).json({message: 'Wallpaper Url is required'});
    }

    const wallpaper = await Wallpaper.findOne({linkCopy});

    if(!wallpaper) {
      return res.status(400).json({message: 'Wallpaper not found'});
    }
    res.json(wallpaper);
   } catch (err) {
    res.status(500).json({message: 'Failed to load Wallpaper Page', error: err.message});
   }
});


app.get('/api/wallpaper/view', async (req, res) => {
  try {
  const { linkCopy} = req.query;
  if (!linkCopy) {
   return res.status(400).json({message: 'Wallpaper url is required'});
  }

  const wallpaperPage = await Wallpaper.findOne({ linkCopy });

  if(!wallpaperPage) {
    return res.status(404).json({message: 'Wallpaper Page not found'});
  }
res.json(wallpaperPage);
  } catch (err) {
    res.status(500).json({message: 'Failed to load wallpaper Page', error: err})
  }
})


const userProfileData = async (req, res) => {
  const user = await User.find().select('-email -password -profileBanner -createdAt -_id -profileAbout')
  res.json(user);
}

app.use('/api/update/wallpaper/downloads', downloadLimiter);

app.patch('/api/update/wallpaper/downloads', async (req, res) => {
  try {
    const { linkCopy } = req.body;  

    if (!linkCopy) {
      return res.status(400).json({ message: 'Wallpaper URL is required' });
    }

    const update = await Wallpaper.findOne({ linkCopy });

    if (!update) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }

    update.downloads += 1;  
    await update.save();  

    return res.status(200).json({ message: 'Updated successfully' });
  } catch (err) {
    console.error('Error updating wallpaper:', err.message);  
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
});


const updateLike = async (req, res) => {
  try {
    const { linkCopy, likedBy } = req.body;

    if (!linkCopy) {
      return res.status(400).json({ message: 'Wallpaper URL is required' });
    }

    if (!likedBy) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const likeUpdate = await Wallpaper.findOne({ linkCopy });

    const isLiked = likeUpdate.likedBy.includes(likedBy);

    if (isLiked) {
     
      await Wallpaper.findOneAndUpdate(
        { linkCopy },
        {
          $pull: { likedBy },    
          $inc: { likes: -1 },  
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Removed like', data: likeUpdate });
    } else {
      await Wallpaper.findOneAndUpdate(
        { linkCopy },
        {
          $addToSet: { likedBy }, 
          $inc: { likes: 1 },    
        },
        { new: true }
      );

      return res.status(200).json({ message: 'Added like', data: likeUpdate });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', err });
  }
};

app.use('/api/update/wallpaper/likes', likeLimiter)

app.patch('/api/update/wallpaper/likes', updateLike);


app.post('/api/user/comment', async (req, res) => {
  try {
    const { user, userLogo, commentText, commentId } = req.body;

    const wallpaper = await Wallpaper.findById(commentId);

    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }

    const comment = new Comment({
      user,
      userLogo,
      commentText,
      commentId: wallpaper._id,
    });
    await comment.save();

    return res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


app.get('/api/user/comment/view', async (req, res) => {
  const { commentId } = req.query;
  try {
    if(!commentId) {
      return res.status(400).json({message: "Comment Id is required"});
    }
    
    const commentView = await Comment.find({commentId});
    res.json(commentView);
  } catch (err) {
    return res.status(500).json({message: 'Error loading comments', err})
  }
});


app.delete('/api/user/comment/view/delete', async (req, res) => {
  const { commentId } = req.query;

  if (!commentId) {
    return res.status(400).json({ message: 'Comment ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid Comment ID format' });
  }

  try {
    const commentView = await Comment.findOneAndDelete({ _id: commentId });

    if (!commentView) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json({ message: 'Comment deleted successfully', comment: commentView });
  } catch (err) {
    console.error('Error deleting comment:', err);
    return res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
});


app.delete('/api/user/wallpaper/delete', async(req, res) => {
  const {wallpaperName} = req.body;
  try {
    const deleteWalpaper = await Wallpaper.findOneAndDelete({ wallpaperName })
    return res.status(200).json({message: 'Deleted Wallpaper'})
  } catch(err){
    return res.status(404).json({message: 'Failed to Delete Wallpaper'})
  }
})

app.get('/api/user/analytics', async(req, res) => {
try {

  const analytics = await Wallpaper.aggregate([
    {
      $group: {
        _id: "$uploaderName",
        totalDownloads: { $sum: "$downloads" },
        totalLikes: {$sum: "$likes"},
        totalUploads: {$sum: 1} 
      }
    }
  ]);

  res.status(200).json(analytics);
} catch (err) {
  res.status(500).json({message: 'Error Calculating analytics'})
}
})


app.get('/api/community', async (req, res) => {
  try {
    const communityData = await User.find().select('-_id -email -password');
    res.json(communityData);
  } catch (err) {
    return res.status(500).json({message: 'Server Failed'})
  }
})


app.get('/api/latestwallpaper', async (req ,res) => {
  try {
    const latestwallpaper = await Wallpaper.find().sort({ uploadDate: -1}).limit(6);
    res.json(latestwallpaper);
  } catch (err) {
    return res.status(500).json({message: 'Server Failed to get latest wallpaper'})
  }
})

const updateLeaderboard = async () => {
  try {
    const users = await User.find(); 
    const wallpapers = await Wallpaper.find(); 

    if (!users || !wallpapers) {
      throw new Error("Failed to fetch users or wallpapers from the database.");
    }

    const leaderboardData = users.map(user => {
      let totalDownloads = 0;

     
      wallpapers.forEach(wallpaper => {
        if (user.username === wallpaper.uploaderName) {
          totalDownloads += wallpaper.downloads || 0; 
        }
      });

      return {
        user: user.username,
        profileLogo: user.profileLogo,
        profileUrl: user.profileUrl,
        downloads: totalDownloads,
      };
    });

    leaderboardData.sort((a, b) => b.downloads - a.downloads);
    const top10LeaderboardData = leaderboardData.slice(0, 10);

    
    top10LeaderboardData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    const bulkOps = top10LeaderboardData.map(entry => ({
      updateOne: {
        filter: { user: entry.user },
        update: { $set: entry },
        upsert: true,
      },
    }));

    
    await Leaderboard.bulkWrite(bulkOps);

    console.log("Leaderboard updated successfully.");
  } catch (err) {
    console.error("Failed to update leaderboard:", err.message);
  }
};

cron.schedule('0 0 * * *', updateLeaderboard)


app.get('/api/topleaderboard', async (req, res) => {
  try {
const TopLeader = await Leaderboard.find();
res.json(TopLeader);
  } catch (err) {
    return res.status(500).json({message: 'Server Failed to show top leaderboard'})
  }
});

app.post('/api/delete-request', async(req, res) => {
  const { username } = req.body;
  try {
const deleteDate = new Date();
deleteDate.setDate(deleteDate.getDate() + 7);

await User.findOneAndUpdate({username}, {deleteAt: deleteDate});
return res.status(200).json({message: 'Delete Request Successful'})

  } catch(err) {
    return res.status(500).json({message: 'Failed to Delete Request'})
  }
})

app.post('/api/cancel-request', async (req, res) => {
  const { username } = req.body;
  try {
    const cancelDelete = await User.findOneAndUpdate({username},
       { $set: {deleteAt: null}})
    return res.status(200).json({message: 'Successfully Canceled'});
  } catch {
    return res.status(500).json({message: 'Failed To Cancel'});
  }
})

const deleteExpiredAccounts = async () => {
  const now = new Date();

  try {
    
    const expiredUsers = await User.find({ deleteAt: { $lte: now } });

    if (expiredUsers.length === 0) return; 

    
    const usernames = expiredUsers.map(user => user.username);

   
    const wallpapers = await Wallpaper.deleteMany({ uploaderName: { $in: usernames } });
    const comments = await Comment.deleteMany({user: {$in: usernames}});
    const leaderboard = await Leaderboard.deleteMany({ user: {$in: usernames}})
    const users = await User.deleteMany({ username: { $in: usernames } });

    console.log(`Deleted ${expiredUsers.length} expired users and their wallpapers.`);
  } catch (error) {
    console.error('Error deleting expired users:', error);
  }
};

cron.schedule('0 * * * *', deleteExpiredAccounts);

app.get('/api/user/profile/data', userProfileData)
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.get('/api/user/data', authenticateToken, getUserData);
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', 
    {path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
  res.status(200).send({message: 'Logged out successfully'});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});
