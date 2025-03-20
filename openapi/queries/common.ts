// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { CommentsService, DepartmentsService, EmployeesService, PrioritiesService, StatusesService, TasksService } from "../requests/services.gen";
export type StatusesServiceGetStatusesDefaultResponse = Awaited<ReturnType<typeof StatusesService.getStatuses>>;
export type StatusesServiceGetStatusesQueryResult<TData = StatusesServiceGetStatusesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useStatusesServiceGetStatusesKey = "StatusesServiceGetStatuses";
export const UseStatusesServiceGetStatusesKeyFn = ({ accept }: {
  accept: string;
}, queryKey?: Array<unknown>) => [useStatusesServiceGetStatusesKey, ...(queryKey ?? [{ accept }])];
export type PrioritiesServiceGetPrioritiesDefaultResponse = Awaited<ReturnType<typeof PrioritiesService.getPriorities>>;
export type PrioritiesServiceGetPrioritiesQueryResult<TData = PrioritiesServiceGetPrioritiesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePrioritiesServiceGetPrioritiesKey = "PrioritiesServiceGetPriorities";
export const UsePrioritiesServiceGetPrioritiesKeyFn = ({ accept }: {
  accept: string;
}, queryKey?: Array<unknown>) => [usePrioritiesServiceGetPrioritiesKey, ...(queryKey ?? [{ accept }])];
export type DepartmentsServiceGetDepartmentsDefaultResponse = Awaited<ReturnType<typeof DepartmentsService.getDepartments>>;
export type DepartmentsServiceGetDepartmentsQueryResult<TData = DepartmentsServiceGetDepartmentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDepartmentsServiceGetDepartmentsKey = "DepartmentsServiceGetDepartments";
export const UseDepartmentsServiceGetDepartmentsKeyFn = ({ accept }: {
  accept: string;
}, queryKey?: Array<unknown>) => [useDepartmentsServiceGetDepartmentsKey, ...(queryKey ?? [{ accept }])];
export type EmployeesServiceGetEmployeesDefaultResponse = Awaited<ReturnType<typeof EmployeesService.getEmployees>>;
export type EmployeesServiceGetEmployeesQueryResult<TData = EmployeesServiceGetEmployeesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEmployeesServiceGetEmployeesKey = "EmployeesServiceGetEmployees";
export const UseEmployeesServiceGetEmployeesKeyFn = ({ accept }: {
  accept: string;
}, queryKey?: Array<unknown>) => [useEmployeesServiceGetEmployeesKey, ...(queryKey ?? [{ accept }])];
export type CommentsServiceGetTasksByTaskCommentsDefaultResponse = Awaited<ReturnType<typeof CommentsService.getTasksByTaskComments>>;
export type CommentsServiceGetTasksByTaskCommentsQueryResult<TData = CommentsServiceGetTasksByTaskCommentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommentsServiceGetTasksByTaskCommentsKey = "CommentsServiceGetTasksByTaskComments";
export const UseCommentsServiceGetTasksByTaskCommentsKeyFn = ({ accept, task }: {
  accept: string;
  task: number;
}, queryKey?: Array<unknown>) => [useCommentsServiceGetTasksByTaskCommentsKey, ...(queryKey ?? [{ accept, task }])];
export type TasksServiceGetTasksDefaultResponse = Awaited<ReturnType<typeof TasksService.getTasks>>;
export type TasksServiceGetTasksQueryResult<TData = TasksServiceGetTasksDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTasksServiceGetTasksKey = "TasksServiceGetTasks";
export const UseTasksServiceGetTasksKeyFn = ({ accept }: {
  accept: string;
}, queryKey?: Array<unknown>) => [useTasksServiceGetTasksKey, ...(queryKey ?? [{ accept }])];
export type TasksServiceGetTasksByIdDefaultResponse = Awaited<ReturnType<typeof TasksService.getTasksById>>;
export type TasksServiceGetTasksByIdQueryResult<TData = TasksServiceGetTasksByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useTasksServiceGetTasksByIdKey = "TasksServiceGetTasksById";
export const UseTasksServiceGetTasksByIdKeyFn = ({ accept, id }: {
  accept: string;
  id: number;
}, queryKey?: Array<unknown>) => [useTasksServiceGetTasksByIdKey, ...(queryKey ?? [{ accept, id }])];
export type EmployeesServicePostEmployeesMutationResult = Awaited<ReturnType<typeof EmployeesService.postEmployees>>;
export type CommentsServicePostTasksByTaskCommentsMutationResult = Awaited<ReturnType<typeof CommentsService.postTasksByTaskComments>>;
export type TasksServicePostTasksMutationResult = Awaited<ReturnType<typeof TasksService.postTasks>>;
export type TasksServicePutTasksByIdMutationResult = Awaited<ReturnType<typeof TasksService.putTasksById>>;
