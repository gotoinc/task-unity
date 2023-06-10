import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../common/entities/common.entity';

@Entity()
export class UserSessionEntity extends CommonEntity {
  @PrimaryColumn({ type: 'uuid' })
  sessionId: string;

  @Column()
  userId: number;

  @Column({ unique: true })
  refreshToken: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
