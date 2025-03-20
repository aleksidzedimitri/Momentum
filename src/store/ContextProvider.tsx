import { createContext, useEffect, useState, useCallback } from "react";

// API URL and Token
const BASE_URL = "https://momentum.redberryinternship.ge/api";
const BEARER_TOKEN = "9e6bd89f-e7c3-4357-a63d-38a1d49630b4";

//  types
interface Status {
  id: number;
  name: string;
  icon: string;
}

interface FilterState {
  departments: string[];
  priorities: string[];
  employeeId: number | null;
}

interface Priority {
  id: number;
  name: string;
  icon: string;
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
  department_id: number;
}

interface Task {
  total_comments: number;
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: Status;
  priority: Priority;
  department: Department;
  employee: Employee;
}

// Define the Context Type
interface StoreContextType {
  statuses: Status[];
  priorities: Priority[];
  departments: Department[];
  employees: Employee[];
  tasks: Task[];
  fetchStatuses: () => void;
  fetchPriorities: () => void;
  fetchDepartments: () => void;
  fetchEmployees: () => void;
  fetchTasks: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

//Context
const StoreContext = createContext<StoreContextType>({
  statuses: [],
  priorities: [],
  departments: [],
  employees: [],
  tasks: [],
  fetchStatuses: () => {},
  fetchPriorities: () => {},
  fetchDepartments: () => {},
  fetchEmployees: () => {},
  fetchTasks: () => {},
  filters: { departments: [], priorities: [], employeeId: null },
  setFilters: () => {},
});

// Provider Component
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    departments: [],
    priorities: [],
    employeeId: null,
  });

  // Fetch Data Helper
  const fetchData = useCallback(
    async <T,>(endpoint: string, setter: (data: T) => void) => {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);

        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  // Fetch Functions
  const fetchStatuses = useCallback(
    () => fetchData<Status[]>("/statuses", setStatuses),
    [fetchData]
  );
  const fetchPriorities = useCallback(
    () => fetchData<Priority[]>("/priorities", setPriorities),
    [fetchData]
  );
  const fetchDepartments = useCallback(
    () => fetchData<Department[]>("/departments", setDepartments),
    [fetchData]
  );

  const fetchTasks = useCallback(
    () => fetchData<Task[]>("/tasks", setTasks),
    [fetchData]
  );
  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);
  // Fetch
  useEffect(() => {
    fetchStatuses();
    fetchPriorities();
    fetchDepartments();
    fetchEmployees();
    fetchTasks();
  }, [
    fetchStatuses,
    fetchPriorities,
    fetchDepartments,
    fetchEmployees,
    fetchTasks,
  ]);

  return (
    <StoreContext.Provider
      value={{
        statuses,
        priorities,
        departments,
        employees,
        tasks,
        fetchStatuses,
        fetchPriorities,
        fetchDepartments,
        fetchEmployees,
        fetchTasks,
        filters,
        setFilters,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
