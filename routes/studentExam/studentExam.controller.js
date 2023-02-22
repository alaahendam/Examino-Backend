const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { examId, userId, startAt, answers, examName, points, endAt } =
    req.body;
  try {
    var createdstudentExam = await prisma.studentExam.create({
      data: {
        user: { connect: { id: Number(userId) } },
        examId: examId,
        start: new Date(startDate),
        end: new Date(endDate),
        points: Number(totalPointes),
        questions: studentExamQuestion,
      },
    });
    return res.status(200).json("success to create studentExam");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
// const studentstudentExams = async (req, res) => {
//   const { id } = req.body;
//   try {
//     var getstudentExams = await prisma.user.findUnique({
//       where: {
//         id: id,
//       },
//       select: {
//         LevelsOnUsers: {
//           select: {
//             level: {
//               select: {
//                 studentExam: true,
//               },
//             },
//           },
//         },
//       },
//     });
//     let studentExams = { activestudentExam: [], futurestudentExam: [] };
//     let today = new Date();
//     if (getstudentExams.LevelsOnUsers) {
//       getstudentExams.LevelsOnUsers.map((level) => {
//         if (level.level.studentExam) {
//           level.level.studentExam.map((studentExam) => {
//             if (new Date(studentExam.start) <= today && new Date(studentExam.end) >= today) {
//               studentExams.activestudentExam.push(studentExam);
//             } else if (new Date(studentExam.start) > today) {
//               studentExams.futurestudentExam.push(studentExam);
//             }
//           });
//         }
//       });
//     }

//     return res.status(200).json(studentExams);
//   } catch (error) {
//     console.log(error);
//   }
// };
module.exports = {
  create,
  //   studentstudentExams,
};
