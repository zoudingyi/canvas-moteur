import { generateId } from "runtime/core/common/utils";
import { error } from "runtime/core/log";
import { Page } from "runtime/functional/project/page";

/**
 * TODO
 */

export interface ProjectOptions {
    name: string;
    version?: string;
}

/**
 * 项目管理
 */
export class Project {
    readonly id: string;
    private name: string;
    private version: string;
    /**
     * 文件路径
     */
    private filePath?: string;

    /**
     * 页面列表
     */
    private pages: Page[] = [];

    constructor(name: string) {
        this.id = generateId({ suffix: '_project' });
        this.name = name;
        this.version = '0.0.1';
    }

    static new(name: string) {
        const target = new Project(name);

        return new Proxy(target, {
            get(target, prop, receiver) {
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                return Reflect.set(target, prop, value, receiver)
            }
        });
    }

    static openProjectFile(filePath: string): Project {
        // TODO：打开项目文件获取信息，并进行实例化
        const project = new Project('');
        // project.id = '';
        // project.name = '';
        // project.version = '';
        // project.filePath = '';

        return project;
    }

    private saveProejctFile(filePath: string) {
        // TODO：保存项目文件到本地
    }

    public save(filePath?: string): void {
        if (this.filePath) {
            this.saveProejctFile(this.filePath)
        } else if (filePath) {
            this.filePath = filePath;
            this.saveProejctFile(filePath);
        } else {
            error("没有文件路径，无法保存")
        }
    }

    public setName(name: string) {
        this.name = name;
    }

    public setVersion(version: string) {
        this.version = version;
    }

    public updateProjectInfo(info: Partial<ProjectOptions>)  {
        Object.keys(info).forEach(key => {
            if (Reflect.has(info, key)) {
                Reflect.set(this, key, Reflect.get(info, key));
            }
        })
    }

    public addPage(page: Page) {
        this.pages.push(page);
        return page;
    }

    public getAllPages() {
        return this.pages
    }
}