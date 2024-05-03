import routeHandler from "@/main/routes/route-handler";
import {registerUserUseCase} from "@/main/factories/compose";
import {UserRegistrationController} from "@/infrastructure/web/controllers/user/UserRegistrationController";
import {NextRequest} from "next/server";

export async function POST(req: NextRequest) {
    return routeHandler(new UserRegistrationController(registerUserUseCase))(req);
}
