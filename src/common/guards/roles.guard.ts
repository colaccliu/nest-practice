import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext):boolean {
        console.log('This is a guard')
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        console.log('Roles is ----', roles)
        if (!roles) return true
        return true
    }
}