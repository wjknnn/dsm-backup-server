/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./app/feedback/dto/create-feedback.dto'),
          {
            CreateFeedbackDto: {
              title: { required: true, type: () => String },
              content: { required: false, type: () => String },
              tags: { required: false, type: () => [String] },
              writer: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/users/dto/create-user.dto'),
          {
            CreateUserDto: {
              id: { required: true, type: () => String },
              name: { required: true, type: () => String },
              grade: { required: false, type: () => Number },
              profileImage: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./app/users/entities/user.entity'),
          {
            User: {
              id: { required: false, type: () => String },
              name: { required: true, type: () => String },
              school_grade: { required: false, type: () => Number },
              profile_image: { required: false, type: () => String },
              created_at: { required: true, type: () => String },
              updated_at: { required: false, type: () => String },
            },
          },
        ],
        [import('./app/users/dto/update-user.dto'), { UpdateUserDto: {} }],
        [
          import('./app/feedback/entities/feedback.entity'),
          {
            Feedback: {
              id: { required: false, type: () => String },
              title: { required: true, type: () => String },
              explanation: { required: false, type: () => String },
              image: { required: false, type: () => String },
              content: { required: false, type: () => String },
              tags: { required: false, type: () => [String] },
              status: { required: false, type: () => Object },
              writer: { required: true, type: () => String },
              feedback: { required: false, type: () => Number },
              created_at: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [import('./app.controller'), { AppController: { getHello: {} } }],
        [
          import('./app/topic/topic.controller'),
          {
            TopicController: {
              getTopicList: { type: [Object] },
              getTopic: { type: Object },
            },
          },
        ],
        [
          import('./app/feedback/feedback.controller'),
          {
            FeedbackController: {
              getFeedbackList: { type: [Object] },
              getFeedback: { type: Object },
            },
          },
        ],
        [
          import('./app/users/users.controller'),
          {
            UsersController: { findOne: { type: Object } },
            UserController: { deleteUser: {} },
            AuthController: { signupUser: {} },
          },
        ],
      ],
    },
  };
};
