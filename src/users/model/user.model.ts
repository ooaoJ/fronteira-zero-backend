import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Rank {
  RECRUTA = 'Recruta',
  VIGIA = 'Vigia',
  SOBREVIVENTE = 'Sobrevivente',
  PATRULHEIRO = 'Patrulheiro',
  CACADOR_DE_HORDAS = 'Caçador de Hordas',
  SARGENTO_DE_MURALHA = 'Sargento de Muralha',
  CAPITAO_DE_EXPEDICAO = 'Capitão de Expedição',
  COMANDANTE_DE_SETOR = 'Comandante de Setor',
  MAJOR_DA_FRONTEIRA = 'Major da Fronteira',
  CORONEL_DO_CAOS = 'Coronel do Caos',
  GENERAL_DA_RESISTENCIA = 'General da Resistência',
  LENDA_DA_FRONTEIRA = 'Lenda da Fronteira'
}

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({
    type: 'enum',
    enum: Rank,
    default: Rank.RECRUTA
  })
  rank: Rank

  @Column({ type: 'int', default: 0 })
  wins: number

  @Column({ type: 'int', default: 0 })
  hordesDefeated: number
}