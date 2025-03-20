// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { CommentsService, DepartmentsService, EmployeesService, PrioritiesService, StatusesService, TasksService } from "../requests/services.gen";
import * as Common from "./common";
export const useStatusesServiceGetStatuses = <TData = Common.StatusesServiceGetStatusesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseStatusesServiceGetStatusesKeyFn({ accept }, queryKey), queryFn: () => StatusesService.getStatuses({ accept }) as TData, ...options });
export const usePrioritiesServiceGetPriorities = <TData = Common.PrioritiesServiceGetPrioritiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePrioritiesServiceGetPrioritiesKeyFn({ accept }, queryKey), queryFn: () => PrioritiesService.getPriorities({ accept }) as TData, ...options });
export const useDepartmentsServiceGetDepartments = <TData = Common.DepartmentsServiceGetDepartmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDepartmentsServiceGetDepartmentsKeyFn({ accept }, queryKey), queryFn: () => DepartmentsService.getDepartments({ accept }) as TData, ...options });
export const useEmployeesServiceGetEmployees = <TData = Common.EmployeesServiceGetEmployeesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseEmployeesServiceGetEmployeesKeyFn({ accept }, queryKey), queryFn: () => EmployeesService.getEmployees({ accept }) as TData, ...options });
export const useCommentsServiceGetTasksByTaskComments = <TData = Common.CommentsServiceGetTasksByTaskCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept, task }: {
  accept: string;
  task: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCommentsServiceGetTasksByTaskCommentsKeyFn({ accept, task }, queryKey), queryFn: () => CommentsService.getTasksByTaskComments({ accept, task }) as TData, ...options });
export const useTasksServiceGetTasks = <TData = Common.TasksServiceGetTasksDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept }: {
  accept: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTasksServiceGetTasksKeyFn({ accept }, queryKey), queryFn: () => TasksService.getTasks({ accept }) as TData, ...options });
export const useTasksServiceGetTasksById = <TData = Common.TasksServiceGetTasksByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ accept, id }: {
  accept: string;
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseTasksServiceGetTasksByIdKeyFn({ accept, id }, queryKey), queryFn: () => TasksService.getTasksById({ accept, id }) as TData, ...options });
export const useEmployeesServicePostEmployees = <TData = Common.EmployeesServicePostEmployeesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  accept: string;
  formData: { name?: string; surname?: string; avatar?: Blob | File; department_id?: number; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  accept: string;
  formData: { name?: string; surname?: string; avatar?: Blob | File; department_id?: number; };
}, TContext>({ mutationFn: ({ accept, formData }) => EmployeesService.postEmployees({ accept, formData }) as unknown as Promise<TData>, ...options });
export const useCommentsServicePostTasksByTaskComments = <TData = Common.CommentsServicePostTasksByTaskCommentsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  accept: string;
  requestBody: { text?: string; parent_id?: integer_null; };
  task: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  accept: string;
  requestBody: { text?: string; parent_id?: integer_null; };
  task: number;
}, TContext>({ mutationFn: ({ accept, requestBody, task }) => CommentsService.postTasksByTaskComments({ accept, requestBody, task }) as unknown as Promise<TData>, ...options });
export const useTasksServicePostTasks = <TData = Common.TasksServicePostTasksMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  accept: string;
  requestBody: { name?: string; description?: string; due_date?: string; status_id?: number; employee_id?: number; priority_id?: number; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  accept: string;
  requestBody: { name?: string; description?: string; due_date?: string; status_id?: number; employee_id?: number; priority_id?: number; };
}, TContext>({ mutationFn: ({ accept, requestBody }) => TasksService.postTasks({ accept, requestBody }) as unknown as Promise<TData>, ...options });
export const useTasksServicePutTasksById = <TData = Common.TasksServicePutTasksByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  accept: string;
  id: number;
  requestBody: { status_id?: number; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  accept: string;
  id: number;
  requestBody: { status_id?: number; };
}, TContext>({ mutationFn: ({ accept, id, requestBody }) => TasksService.putTasksById({ accept, id, requestBody }) as unknown as Promise<TData>, ...options });
