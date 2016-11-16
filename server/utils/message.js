var generateMessage = (text, from) => {
  return {
    text,
    from,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage}; 
