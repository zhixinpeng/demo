import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    ) {}

    async createCat(cat: Cat): Promise<Cat> {
        delete cat.id;
        return this.catRepository.save(this.catRepository.create(cat));
    }

    async deleteCat(id: number): Promise<void> {
        await this.findOneById(id);
        this.catRepository.delete(id);
    }

    async updateCat(id: number, cat: Cat): Promise<void> {
        const existCat = await this.findOneById(id);
        existCat.nickname =
            cat && cat.nickname ? cat.nickname : existCat.nickname;
        existCat.species = cat && cat.species ? cat.species : existCat.species;
        this.catRepository.save(existCat);
    }

    async findOneCat(id: number): Promise<Cat> {
        return this.findOneById(id);
    }

    private async findOneById(id: number): Promise<Cat> {
        const catInfo = await this.catRepository.findOne(id);
        if (!catInfo) {
            throw new HttpException(`指定 id=${id} 的猫猫不存在`, 404);
        }
        return catInfo;
    }
}
