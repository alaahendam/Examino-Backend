const { PrismaClient } = require("@prisma/client");
const exam = require("../exam/exam.router");
const prisma = new PrismaClient();

const create = async (req, res) => {
  const { examId, userId, answers, examName, points, examEnd } = req.body;
  try {
    var findStudentExam = await prisma.studentExam.findUnique({
      where: {
        userId_examId: {
          userId: userId,
          examId: examId,
        },
      },
    });
    if (findStudentExam) {
      return res.status(200).json(findStudentExam);
    } else {
      var createdstudentExam = await prisma.studentExam.create({
        data: {
          user: { connect: { id: Number(userId) } },
          examId: examId,
          examName: examName,
          points: Number(points),
          answers: answers,
          examEnd: new Date(examEnd),
        },
      });
      console.log("create student Exam", createdstudentExam);
      return res.status(200).json(createdstudentExam);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
function multipleInArray(arr, values) {
  let flag = 0;
  values.map((value) => {
    if (arr.includes(value)) {
      flag += 1;
    }
  });
  return flag;
}
const submitExam = async (req, res) => {
  const { examId, userId, answers, points } = req.body;
  let tempScore = 0;
  try {
    const examOwner = await prisma.exam.findUnique({
      where: {
        id: examId,
      },
      select: {
        level: {
          select: {
            owner: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    answers.map((answerInfo) => {
      switch (answerInfo.questionType) {
        case "radio":
          if (answerInfo.studentAnswer === answerInfo.correctAnswer) {
            tempScore += Number(answerInfo.pointes);
            answerInfo.score = Number(answerInfo.pointes);
          }
          break;
        case "checkbox":
          if (
            answerInfo.studentAnswer.length === answerInfo.correctAnswer.length
          ) {
            if (
              multipleInArray(
                answerInfo.correctAnswer,
                answerInfo.studentAnswer
              ) == answerInfo.correctAnswer.length
            ) {
              tempScore += Number(answerInfo.pointes);
              answerInfo.score = Number(answerInfo.pointes);
            } else if (
              multipleInArray(
                answerInfo.correctAnswer,
                answerInfo.studentAnswer
              ) ==
              answerInfo.correctAnswer.length - 1
            ) {
              tempScore +=
                Number(answerInfo.pointes) *
                (multipleInArray(
                  answerInfo.correctAnswer,
                  answerInfo.studentAnswer
                ) /
                  answerInfo.correctAnswer.length);
              answerInfo.score =
                Number(answerInfo.pointes) *
                (multipleInArray(
                  answerInfo.correctAnswer,
                  answerInfo.studentAnswer
                ) /
                  answerInfo.correctAnswer.length);
            }
          }
          break;
        default:
          break;
      }
    });
    var submitedStudentExam = await prisma.studentExam.update({
      where: {
        userId_examId: {
          userId: userId,
          examId: examId,
        },
      },
      data: {
        score: tempScore,
        endAt: new Date(),
        answers: answers,
        grade: (tempScore / points) * 100,
        teacherName: examOwner.level.owner.name,
      },
    });
    return res.status(200).send(submitedStudentExam);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const getStudentExams = async (req, res) => {
  const { userId, examId } = req.body;
  try {
    const getExams = await prisma.studentExam.findMany({
      where: {
        userId_examId: {
          userId: userId,
          examId: examId,
        },
      },
    });
    return res.status(200).send(getExams);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
const studentCertificates = async (req, res) => {
  try {
    const certificates = await prisma.studentExam.findMany({
      where: {
        userId: Number(req.params.id),
        grade: {
          gte: 75,
        },
        examEnd: {
          lte: new Date(),
        },
      },
    });
    return res.status(200).json(certificates);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
const StudentsExamResult = async (req, res) => {
  try {
    const results = await prisma.studentExam.findMany({
      where: {
        examId: Number(req.params.id),
      },
      include: {
        user: true,
      },
    });
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};
module.exports = {
  create,
  submitExam,
  getStudentExams,
  studentCertificates,
  StudentsExamResult,
};
