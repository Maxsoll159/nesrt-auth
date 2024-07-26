import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RawHeaders = createParamDecorator(
    (data, ctx: ExecutionContext) => {
     
        const probando = ctx.switchToHttp().getRequest()
        const rawHeaders = probando.rawHeaders
        return rawHeaders
    }

)