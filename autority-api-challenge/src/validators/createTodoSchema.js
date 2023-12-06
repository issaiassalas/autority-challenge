const todoSchema = {
  name: {
    notEmpty: true,
    isString: true,
    options: {
      isLength: {
        max: 255,
      },
    },
    errorMessage: 'The name is not valid',
  },
  description: {
    notEmpty: true,
    isString: true,
    options: {
      isLength: {
        max: 255,
      },
    },
    errorMessage: 'The description is not valid',
  },
  author: {
    notEmpty: true,
    isString: true,
    errorMessage: 'The author is not valid',
  },
  isComplete: {
    optional: true,
    default: false,
  },
};

export default todoSchema;
