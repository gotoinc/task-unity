import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserSessionEntity {
  @PrimaryColumn({ type: 'uuid' })
  sessionId: string;

  @Column()
  userId: number;

  @Column({ unique: true })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
