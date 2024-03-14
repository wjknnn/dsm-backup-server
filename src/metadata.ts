/* eslint-disable */
export default async () => {
    const t = {
        ["./users/entities/user.entity"]: await import("./users/entities/user.entity")
    };
    return { "@nestjs/swagger": { "models": [[import("./users/dto/create-user.dto"), { "CreateUserDto": { name: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: false, type: () => String } } }], [import("./users/dto/update-user.dto"), { "UpdateUserDto": {} }], [import("./users/entities/user.entity"), { "User": { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: false, type: () => String }, createAt: { required: true, type: () => Date }, updatedAt: { required: false, type: () => Date } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": {} } }], [import("./users/users.controller"), { "UsersController": { "create": {}, "findAll": { type: [t["./users/entities/user.entity"].User] }, "findOne": { type: t["./users/entities/user.entity"].User }, "update": {}, "remove": {} } }]] } };
};