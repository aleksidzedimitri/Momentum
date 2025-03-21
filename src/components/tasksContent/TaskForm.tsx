import React, { useState, useEffect, useContext } from "react";
import styles from "./TaskForm.module.css";
import CustomSelect, { CustomSelectItem } from "../Dropdown/CustomSelect";
import { useNavigate } from "react-router";
import { StoreContext } from "../../store/ContextProvider";
import Modal from "../Modal/Modal";

const BASE_URL = "https://momentum.redberryinternship.ge/api";
const BEARER_TOKEN = "9e6bd89f-e7c3-4357-a63d-38a1d49630b4";

// Define interfaces for fetched data
interface Priority {
  id: number;
  name: string;
  icon: string;
}

interface Status {
  id: number;
  name: string;
  icon?: string;
}

interface Department {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: {
    id: number;
    name: string;
  };
}

// Utility to retrieve data from localStorage with a fallback value
const getLocalData = <T,>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? (JSON.parse(saved) as T) : defaultValue;
};

export default function TaskForm() {
  const { fetchTasks } = useContext(StoreContext);
  const navigate = useNavigate();

  // Local states initialized with localStorage data if available
  const [name, setName] = useState<string>(getLocalData("task_name", ""));
  const [description, setDescription] = useState<string>(
    getLocalData("task_description", "")
  );
  const [priority, setPriority] = useState<number | null>(
    getLocalData("task_priority", null)
  );
  const [status, setStatus] = useState<number | null>(
    getLocalData("task_status", null)
  );
  const [department, setDepartment] = useState<number | null>(
    getLocalData("task_department", null)
  );
  const [employee, setEmployee] = useState<number | null>(
    getLocalData("task_employee", null)
  );
  const [dueDate, setDueDate] = useState<string>(
    getLocalData("task_dueDate", new Date().toISOString().split("T")[0])
  );

  // Persist form data to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("task_name", JSON.stringify(name));
    localStorage.setItem("task_description", JSON.stringify(description));
    localStorage.setItem("task_priority", JSON.stringify(priority));
    localStorage.setItem("task_status", JSON.stringify(status));
    localStorage.setItem("task_department", JSON.stringify(department));
    localStorage.setItem("task_employee", JSON.stringify(employee));
    localStorage.setItem("task_dueDate", JSON.stringify(dueDate));
  }, [name, description, priority, status, department, employee, dueDate]);

  // Data fetched from the server
  const [departments, setDepartments] = useState<Department[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  //Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation state for inputs
  const [nameValid, setNameValid] = useState(false);
  const [textareaValid, setTextareaValid] = useState(false);

  // Function to clear stored form data from localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem("task_name");
    localStorage.removeItem("task_description");
    localStorage.removeItem("task_priority");
    localStorage.removeItem("task_status");
    localStorage.removeItem("task_department");
    localStorage.removeItem("task_employee");
    localStorage.removeItem("task_dueDate");
  };

  // Clear localStorage when the component unmounts
  useEffect(() => {
    return () => {
      clearLocalStorage();
    };
  }, []);

  // Fetch all necessary data (departments, priorities, statuses, employees) once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Departments
        let resp = await fetch(`${BASE_URL}/departments`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (!resp.ok) throw new Error("Failed to fetch departments");
        let data = await resp.json();
        setDepartments(data);

        // 2) Priorities
        resp = await fetch(`${BASE_URL}/priorities`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (!resp.ok) throw new Error("Failed to fetch priorities");
        data = await resp.json();
        setPriorities(data);

        if (getLocalData("task_priority", null) === null && data.length > 0) {
          setPriority(data[0].id);
        }

        // 3) Statuses
        resp = await fetch(`${BASE_URL}/statuses`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (!resp.ok) throw new Error("Failed to fetch statuses");
        data = await resp.json();
        setStatuses(data);

        if (getLocalData("task_status", null) === null && data.length > 0) {
          setStatus(data[0].id);
        }

        // 4) Employees (fetch all, then filter client-side)
        resp = await fetch(`${BASE_URL}/employees`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        });
        if (!resp.ok) throw new Error("Failed to fetch employees");
        data = await resp.json();
        setEmployees(data);
      } catch (error) {
        console.error("Initial data fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // Validate name: must be 2–255 characters (Georgian/Latin letters)
  const validateName = (value: string) => {
    const isValid = value.trim().length >= 3 && value.trim().length <= 255;
    setNameValid(isValid);
  };

  // Validate description: minimum 4 words, max 255 characters
  const validateTextArea = (value: string) => {
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    const isValid = wordCount >= 4 && value.length <= 255;
    setTextareaValid(isValid);
  };

  // Handle form submission to create a new task via POST /tasks
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dueDateTime = `${dueDate}T00:00:00Z`;
    const payload = {
      name,
      description,
      due_date: dueDateTime,
      status_id: status,
      employee_id: employee,
      priority_id: priority,
    };

    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Task creation failed:", errorData);
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      console.log("New task created:", newTask);

      fetchTasks();
      // Reset form fields and clear stored data
      setName("");
      setDescription("");
      setPriority(null);
      setStatus(null);
      setDepartment(null);
      setEmployee(null);
      setDueDate(new Date().toISOString().split("T")[0]);
      clearLocalStorage();
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Prepare options for CustomSelect components
  const priorityOptions: CustomSelectItem[] = priorities.map((p: Priority) => ({
    value: p.id,
    label: p.name,
    avatar: p.icon,
  }));

  const statusOptions: CustomSelectItem[] = statuses.map((s: Status) => ({
    value: s.id,
    label: s.name,
    avatar: s.icon,
  }));

  const departmentOptions: CustomSelectItem[] = departments.map(
    (d: Department) => ({
      value: d.id,
      label: d.name,
    })
  );

  // Filter employees based on selected department
  const filteredEmployees: Employee[] = department
    ? employees.filter((emp) => emp.department.id === department)
    : [];

  const employeeOptions: CustomSelectItem[] = filteredEmployees.map((emp) => ({
    value: emp.id,
    label: `${emp.name} ${emp.surname}`,
    avatar: emp.avatar,
  }));

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {/* LEFT SIDE: Task title, description, priority & status */}
      <div className={styles.leftSide}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.labels}>
            სათაური*
          </label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
            required
          />
          <p className={nameValid ? styles.valid : styles.invalid}>
            მინიმუმ 2 სიმბოლო
          </p>
          <p className={nameValid ? styles.valid : styles.invalid}>
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.labels}>
            აღწერა
          </label>
          <textarea
            name="description"
            rows={4}
            className={styles.textarea}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              validateTextArea(e.target.value);
            }}
          />
          <p className={textareaValid ? styles.valid : styles.invalid}>
            მინიმუმ 4 სიტყვა
          </p>
          <p className={textareaValid ? styles.valid : styles.invalid}>
            მაქსიმუმ 255 სიმბოლო
          </p>
        </div>

        <div className={styles.flexRow}>
          <div className={styles.formGroup}>
            <CustomSelect
              label="პრიორიტეტი*"
              options={priorityOptions}
              value={priority}
              onChange={(val) => setPriority(val)}
              isSearchable={false}
              width="260px"
            />
          </div>
          <div className={styles.formGroup}>
            <CustomSelect
              label="სტატუსი*"
              options={statusOptions}
              value={status}
              onChange={(val) => setStatus(val)}
              isSearchable={false}
              width="260px"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Department, employee, due date & submit */}
      <div className={styles.rightSide}>
        <div className={styles.formGroup}>
          <CustomSelect
            label="დეპარტამენტი*"
            options={departmentOptions}
            value={department ?? null}
            onChange={(val) => setDepartment(val ? Number(val) : null)}
            isSearchable={false}
            width="550px"
            height="45px"
          />
        </div>

        <div
          className={styles.formGroup}
          style={{
            opacity: department ? 1 : 0,
            pointerEvents: department ? "auto" : "none",
            transition: "opacity 0.3s ease",
          }}
        >
          <CustomSelect
            label="თანამშრომელი*"
            options={employeeOptions}
            value={employee}
            onChange={(val) => setEmployee(val)}
            isSearchable={false}
            width="550px"
            height="45px"
            prependOption={{
              value: -1,
              label: "დაამატე თანამშრომელი",
            }}
            openModal={() => setIsModalOpen(true)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dueDate" className={styles.labels}>
            დედლაინი
          </label>
          <input
            type="date"
            name="dueDate"
            className={styles.dateInput}
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          დავალების შექმნა
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </form>
  );
}
