import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Task } from './Task';

@Entity()
export class Tracking{
    @PrimaryGeneratedColumn()
    trackingid: number;

    @Column({nullable:false})
    description: string;

    @Column({type:"time",default:0})
    timestart: string;

    @Column({type:"time",default:0})
    timeend: string;
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @ManyToOne(()=> Task, task => task.trackings, {onDelete: "CASCADE"})
    task: Task
}