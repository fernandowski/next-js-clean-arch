
import TodoTable from "@/app/components/User/TodoTable";
import {checkAuth} from "@/app/components/AuthCheck";

export default async function DashboardPage() {

    return (
        <TodoTable></TodoTable>
    );
}
