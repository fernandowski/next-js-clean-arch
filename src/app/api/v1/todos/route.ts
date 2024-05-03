import {NextRequest} from "next/server";
import routeHandler from "@/main/routes/route-handler";
import {ListTodoListController} from "@/infrastructure/web/controllers/todo-list/ListTodoListController";
import {addTodoListUseCase, listUserTodoList} from "@/main/factories/compose";
import {AddTodoListController} from "@/infrastructure/web/controllers/todo-list/AddTodoListController";

export async function GET(req: NextRequest) {
    return routeHandler(new ListTodoListController(listUserTodoList))(req);
}

export async function POST(req: NextRequest) {
    return routeHandler(new AddTodoListController(addTodoListUseCase))(req);
}
