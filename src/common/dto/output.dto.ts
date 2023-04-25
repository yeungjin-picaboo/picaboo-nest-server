import { Entity } from 'typeorm';

@Entity()
export class CoreOutput {
  ok: boolean;
  error?: string;
  message?: string;
}

function returnMsg(ok: boolean, message: string) {
  return {
    ok,
    message
  };
}

export { returnMsg };
