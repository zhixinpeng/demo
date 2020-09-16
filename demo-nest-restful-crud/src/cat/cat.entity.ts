import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export class Cat {
    @PrimaryGeneratedColumn({
        comment: '自增ID',
    })
    id: number;

    @Column({
        comment: '昵称',
    })
    nickname: string;

    @Column({
        comment: '品种',
    })
    species: string;
}
