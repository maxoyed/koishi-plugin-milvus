import { Context, Schema, Service } from "koishi";
import { MilvusClient } from "@zilliz/milvus2-sdk-node";


declare module "koishi" {
  interface Context {
    milvus: MilvusService;
  }
}


class MilvusService extends Service {
  
  public client: MilvusClient;
  constructor(public ctx: Context,public config: MilvusService.Config) {
    super(ctx, "milvus");
    this.client = new MilvusClient({
      address: `${config.host}:${config.port}`,
      username: config.username,
      password: config.password,
    });
    ctx.on("dispose", async ()=> {
      await this.client.closeConnection();
    });
  }
}

namespace MilvusService {
  export interface Config {
    host: string;
    port: number;
    username?: string;
    password?: string;
  };
  export const Config: Schema<Config> = Schema.object({
    host: Schema.string().default("localhost").description("IP地址/域名"),
    port: Schema.number().min(1).max(65535).default(19530).description("端口"),
    username: Schema.string().description("用户名"),
    password: Schema.string().role('secret').description("密码"),
  }).description("Milvus 配置");
  
}

export default MilvusService;