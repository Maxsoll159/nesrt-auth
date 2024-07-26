import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data, ctx:ExecutionContext)=>{

        if(data){
            const req = ctx.switchToHttp().getRequest();
            const user = req.user;
            return user[data]
        }
        

        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if(!user)
            throw new InternalServerErrorException('user no found')

        return user
    }
);