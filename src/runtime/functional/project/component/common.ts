import { generateId } from "runtime/core/common/utils";
import { ComponentStyle } from "./style";

export enum componentTag {
    /**
     * 包含HTML、canvas的混合组件
     */
    MIX_COMPONENT,
    /**
     * 纯HTML组件
     */
    HTML,
    /**
     * 纯canvas组件
     */
    CANVAS,
    /**
     * 由基础组件组合成的一种组件
     */
    GROUP_COMPONENT,
}

export enum componentType {
    Rect = 'Rect',
    Input = 'Input'
}

export interface IComponent {
    id: string;
    name: string;
    type: componentType;
    tag: componentTag;
    components: Component[];
    position: {
        x: number;
        y: number;
    };

    addComponent(components: Component): Component;
    getAllComponents(): Component[];
}

export interface IComponentOptions {
    position?: {
        x: number;
        y: number;
    },
    name: string;
    style?: ComponentStyle | CSSStyleDeclaration;
}

export interface COptions {
    name: string;
    type: componentType;
    tag: componentTag;
} 

export abstract class Component implements IComponent {
    id: string;
    name: string;
    type: componentType;
    tag: componentTag;
    components: Component[] = [];
    position!: {
        x: number;
        y: number;
    };
    
    constructor({ name, type, tag }: COptions) {
        this.id = generateId({ suffix: '_component' });
        this.name = name;
        this.type = type;
        this.tag = tag;
    }

    public addComponent(component: Component) {
        this.components.push(component);
        return component;
    }
    

    public getAllComponents() {
        return this.components;
    }
    // TODO 组件管理相关功能
}
