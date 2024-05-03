import {NextRequest} from "next/server";
import routeHandler from "@/main/routes/route-handler";
import {MarkTodoAsCompletedController} from "@/infrastructure/web/controllers/todo-list/MarkTodoAsCompletedController";
import {markTodoAsCompletedUseCase} from "@/main/factories/compose";

export async function PUT(req: NextRequest, { params }: { params: { todoId: string } }) {
    return routeHandler(new MarkTodoAsCompletedController(markTodoAsCompletedUseCase))(req, params)
}
