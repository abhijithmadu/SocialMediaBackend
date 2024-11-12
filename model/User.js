import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isBlocked: {
      status: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: null, 
      },
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicture: { type: String },
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    ],
    token: { type: String },
    lastActive: { type: Date, default: Date.now },
    hiddenPosts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] },
    ],
    hiddenUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] },
    ],
    online: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
    },
    story: [
      {
        imageUrl: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        views: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            viewedAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const otpSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

userSchema.methods.hashFreshStory = async function () {
  const twentyFourHoursInMilliseconds = 1000 * 60 * 60 * 24;
  return this.story.some(
    (story) =>
      story.createdAt.getTime() > Date.now() - twentyFourHoursInMilliseconds
  );
};

const Otp = model('Otp', otpSchema);
const User = model('User', userSchema);

export { User, Otp };
