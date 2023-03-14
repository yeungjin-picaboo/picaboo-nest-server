import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class GoogleUser extends BaseEntity {
	@PrimaryColumn()
	email: string;

	@Column({ nullable: true })
	nick_name: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
