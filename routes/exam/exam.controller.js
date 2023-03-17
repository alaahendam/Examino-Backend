const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async (req, res) => {
  const {
    level,
    examName,
    duration,
    startDate,
    endDate,
    totalPointes,
    examQuestion,
    ownerId,
  } = req.body;
  try {
    var createdExam = await prisma.exam.create({
      data: {
        level: { connect: { id: Number(level.id) } },
        examName: examName,
        duration: Number(duration),
        start: startDate,
        end: endDate,
        points: Number(totalPointes),
        questions: examQuestion,
        ownerId: Number(ownerId),
      },
    });
    return res.status(200).json(createdExam);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const studentExams = async (req, res) => {
  const { id } = req.body;
  try {
    var getExams = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        LevelsOnUsers: {
          select: {
            level: {
              select: {
                Exam: true,
              },
            },
          },
        },
      },
    });
    const getOldExams = await prisma.studentExam.findMany({
      where: {
        userId: id,
        examEnd: {
          lte: new Date(),
        },
      },
    });
    let exams = { activeExam: [], futureExam: [], oldExam: getOldExams };
    let today = new Date();
    if (getExams.LevelsOnUsers) {
      getExams.LevelsOnUsers.map((level) => {
        if (level.level.Exam) {
          level.level.Exam.map((exam) => {
            if (new Date(exam.start) <= today && new Date(exam.end) >= today) {
              exams.activeExam.push(exam);
            } else if (new Date(exam.start) > today) {
              exams.futureExam.push(exam);
            }
          });
        }
      });
    }

    return res.status(200).json(exams);
  } catch (error) {
    console.log(error);
  }
};
const getAllTeacherExams = async (req, res) => {
  try {
    const teacherExams = await prisma.exam.findMany({
      where: {
        ownerId: Number(req.params.id),
      },
      orderBy: {
        start: "desc",
      },
    });
    return res.status(200).json(teacherExams);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const deleteExam = async (req, res) => {
  try {
    const del = await prisma.exam.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.status(200).send("delete success");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
module.exports = {
  create,
  studentExams,
  getAllTeacherExams,
  deleteExam,
};
