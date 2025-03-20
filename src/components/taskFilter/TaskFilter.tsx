import { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../../store/ContextProvider";
import { FaChevronDown } from "react-icons/fa";
import styles from "./TaskFilter.module.css";

export default function TaskFilter() {
  const { departments, employees, priorities, setFilters } =
    useContext(StoreContext);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFilters = localStorage.getItem("taskFilters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setSelectedDepartments(parsedFilters.departments || []);
      setSelectedPriorities(parsedFilters.priorities || []);
      setSelectedEmployee(parsedFilters.employeeId || null);
    }
  }, []);

  useEffect(() => {
    const filters = {
      departments: selectedDepartments,
      priorities: selectedPriorities,
      employeeId: selectedEmployee,
    };
    setFilters(filters);
    localStorage.setItem("taskFilters", JSON.stringify(filters)); // Save filters
  }, [selectedDepartments, selectedPriorities, selectedEmployee, setFilters]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem("taskFilters");
    };
  }, []);

  const toggleDepartment = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((item) => item !== department)
        : [...prev, department]
    );
  };

  const togglePriority = (priority: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  };

  const toggleEmployeeSelection = (employeeId: number) => {
    setSelectedEmployee(selectedEmployee === employeeId ? null : employeeId);
  };

  const removeFilter = (filterType: string, value: string | number) => {
    if (filterType === "department") {
      setSelectedDepartments((prev) => prev.filter((d) => d !== value));
    }
    if (filterType === "priority") {
      setSelectedPriorities((prev) => prev.filter((p) => p !== value));
    }
    if (filterType === "employee") {
      setSelectedEmployee(null);
    }
  };

  return (
    <div className={styles.filterMainContainer}>
      <div className={styles.filterContainer} ref={dropdownRef}>
        {/* Department Filter */}
        <div className={styles.selectWrapper}>
          <div
            className={`${styles.select} ${
              activeFilter === "department" ? styles.active : ""
            }`}
            onClick={() =>
              setActiveFilter(
                activeFilter === "department" ? null : "department"
              )
            }
          >
            <span>დეპარტამენტი</span>
            <FaChevronDown />
          </div>
          {activeFilter === "department" && (
            <div className={styles.dropdown}>
              {departments.map((department) => (
                <label key={department.id} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(department.name)}
                    onChange={() => toggleDepartment(department.name)}
                  />
                  {department.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Priority Filter */}
        <div className={styles.selectWrapper}>
          <div
            className={`${styles.select} ${
              activeFilter === "priority" ? styles.active : ""
            }`}
            onClick={() =>
              setActiveFilter(activeFilter === "priority" ? null : "priority")
            }
          >
            <span>პრიორიტეტი</span>
            <FaChevronDown />
          </div>
          {activeFilter === "priority" && (
            <div className={styles.dropdown}>
              {priorities.map((priority) => (
                <label key={priority.id} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedPriorities.includes(priority.name)}
                    onChange={() => togglePriority(priority.name)}
                  />
                  {priority.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Employee Filter */}
        <div className={styles.selectWrapper}>
          <div
            className={`${styles.select} ${
              activeFilter === "employee" ? styles.active : ""
            }`}
            onClick={() =>
              setActiveFilter(activeFilter === "employee" ? null : "employee")
            }
          >
            <span>თანამშრომელი</span>
            <FaChevronDown />
          </div>
          {activeFilter === "employee" && (
            <div className={styles.dropdown}>
              {employees.map((employee) => (
                <label key={employee.id} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedEmployee === employee.id}
                    onChange={() => toggleEmployeeSelection(employee.id)}
                  />
                  {employee.name} {employee.surname}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>


      <div className={styles.selectedFilters}>
        {selectedDepartments.map((dep) => (
          <span key={dep} className={styles.filterTag}>
            {dep}{" "}
            <img
              src="/assets/images/x.svg"
              className={styles.filteredIcon}
              onClick={() => removeFilter("department", dep)}
            />
          </span>
        ))}
        {selectedPriorities.map((prio) => (
          <span key={prio} className={styles.filterTag}>
            {prio}{" "}
            <img
              src="/assets/images/x.svg"
              className={styles.filteredIcon}
              onClick={() => removeFilter("priority", prio)}
            />
          </span>
        ))}
        {selectedEmployee && (
          <span className={styles.filterTag}>
            {employees.find((e) => e.id === selectedEmployee)?.name}{" "}
            <img
              src="/assets/images/x.svg"
              className={styles.filteredIcon}
              onClick={() => removeFilter("employee", selectedEmployee)}
            />
          </span>
        )}
      </div>
    </div>
  );
}
