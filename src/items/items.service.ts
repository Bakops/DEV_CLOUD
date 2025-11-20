import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    private items: Item[] = [];
    private nextId = 1;

    findAll(): Item[] {
        return this.items;
    }

    findOne(id: number): Item {
        const item = this.items.find(i => i.id === id);
        if (!item) throw new NotFoundException(`Item ${id} introuvable`);
        return item;
    }

    create(createDto: CreateItemDto): Item {
        const item: Item = { id: this.nextId++, ...createDto };
        this.items.push(item);
        return item;
    }

    update(id: number, update: Partial<CreateItemDto>): Item {
        const item = this.findOne(id);
        Object.assign(item, update);
        return item;
    }

    remove(id: number): void {
        const idx = this.items.findIndex(i => i.id === id);
        if (idx === -1) throw new NotFoundException();
        this.items.splice(idx, 1);
    }
}
