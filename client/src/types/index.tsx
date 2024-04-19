export type TodoType = {
  _id: string;
  name: string;
  description: string;
  status: StatusType;
};

export type StatusType = "NEW" | "IN_PROGRESS" | "DONE" | "DELETE";
