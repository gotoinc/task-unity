import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserSessionEntity {
  @PrimaryColumn({ type: 'uuid' })
  sessionId: string;

  @Column()
  userId: number;

  @Column({ unique: true })
  refreshToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
