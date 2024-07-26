import AdminActionType from "./AdminActionType";

export function AdminDash(res) {
    return {
      type: AdminActionType.AdminDash,
      res
    }
}

export function AdminReport(res){
    return {
        type: "NEW",
        res
      }
}