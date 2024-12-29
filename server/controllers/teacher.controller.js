import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import { generateAttendanceReport } from "../services/excelService.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const teacher = await Teacher.findOne({ username });

    if (!teacher || !(await bcrypt.compare(password, teacher.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: teacher._id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: teacher._id, name: teacher.username } });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const {
      name,
      class: className,
      section,
      registerNo,
      username,
      password,
    } = req.body;
    const photo = req.file?.path;

    if (!photo) {
      return res.status(400).json({ message: "Student photo is required" });
    }

    // Check if student with the given register number already exists
    let student = await Student.findOne({ registerNo });

    if (student) {
      // Ensure student.teachers is defined
      if (!student.teachers) {
        student.teachers = [];
      }

      // Student already exists, add teacher reference if not already present
      if (!student.teachers.includes(req.user.id)) {
        student.teachers.push(req.user.id);
        await student.save();
      }

      // Add student to teacher's students array if not already present
      await Teacher.findByIdAndUpdate(req.user.id, {
        $addToSet: { students: student._id },
      });

      return res.status(200).json({
        message: "Student already exists, added to your students list",
        student: {
          id: student._id,
          name: student.name,
          registerNo: student.registerNo,
          photo: student.photo,
          class: student.class,
          section: student.section,
        },
        exists: true,
      });
    }

    // Check if username already exists
    const existingStudent = await Student.findOne({ username });

    if (existingStudent) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    student = new Student({
      name,
      class: className,
      section,
      registerNo,
      username,
      password: hashedPassword,
      photo,
      teachers: [req.user.id],
    });

    await student.save();

    // Add student to teacher's students array
    await Teacher.findByIdAndUpdate(req.user.id, {
      $push: { students: student._id },
    });

    res.status(201).json({
      message: "Student added successfully",
      student: {
        id: student._id,
        name: student.name,
        registerNo: student.registerNo,
        photo: student.photo,
        class: student.class,
        section: student.section,
      },
      exists: false,
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { studentId, subject, present } = req.body;

    // Verify student belongs to teacher
    const teacher = await Teacher.findById(req.user.id);
    if (!teacher.students.includes(studentId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to mark attendance for this student" });
    }

    // Add attendance record
    await Student.findByIdAndUpdate(studentId, {
      $push: {
        attendance: {
          date: new Date(),
          subject,
          present,
        },
      },
    });

    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
};

export const downloadAttendanceReport = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { date } = req.query;

    // Get all students for this teacher
    const teacher = await Teacher.findById(teacherId).populate("students");

    // Get attendance records for these students
    const attendanceRecords = await Student.aggregate([
      {
        $match: {
          _id: { $in: teacher.students },
        },
      },
      {
        $unwind: "$attendance",
      },
      {
        $match: {
          "attendance.date": {
            $gte: new Date(date || new Date().toISOString().split("T")[0]),
          },
        },
      },
      {
        $project: {
          name: 1,
          class: 1,
          section: 1,
          registerNo: 1,
          "attendance.date": 1,
          "attendance.subject": 1,
          "attendance.present": 1,
        },
      },
    ]);

    // Generate Excel file
    const filePath = await generateAttendanceReport(
      attendanceRecords,
      teacherId
    );

    // Send file
    res.download(filePath);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Failed to generate attendance report" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      class: className,
      section,
      registerNo,
      username,
      photo,
    } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        class: className,
        section,
        registerNo,
        username,
        photo: req.file ? req.file.filename : photo,
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Remove student reference from teacher
    await Teacher.updateMany(
      { students: req.params.id },
      { $pull: { students: req.params.id } }
    );

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};
