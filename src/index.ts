import { Context, Schema } from "koishi";
import { MilvusService } from "./service";

export const name = "milvus";

export interface Config {
  host: string;
  port: number;
  username: string;
  password: string;
}

export const Config: Schema<Config> = Schema.object({
  host: Schema.string()
    .default("127.0.0.1")
    .required()
    .description("IP地址/域名"),
  port: Schema.number().default(19530).required().description("端口"),
  username: Schema.string().required().description("用户名"),
  password: Schema.string().required().description("密码"),
}).description("Milvus 配置");

export function apply(ctx: Context, config: Config) {
  ctx.plugin(MilvusService, config);
}
