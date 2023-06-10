import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
