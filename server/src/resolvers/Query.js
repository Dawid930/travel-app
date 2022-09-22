const travels = async(parent, args, context) => {
    return await context.prisma.travel.findMany();
} 
  
  module.exports = {
    travels,
  };


    