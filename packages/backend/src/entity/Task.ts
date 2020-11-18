import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Label } from './Label';
import { Tracking } from './Tracking';

@Entity()
export class Task{
    @PrimaryGeneratedColumn()
    taskid: number;

    @Column({nullable:false})
    name: string;

    @Column({nullable:true})
    description: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToMany(() => Label, label => label.tasks, {cascade:true})
    @JoinTable()
    labels: Label[];

    @OneToMany(() => Tracking, tracking => tracking.task)
    trackings: Tracking[]
}