type ValidateResult = {
    errors: any,
    message: string,
} | boolean;

const validateRequired = (value: any): boolean => {
    return value !== '' && value !== null && value !== undefined;
};

const Api = {
    /**
     * 路由控制
     */
    router: {
        /**
         * 跳转至新路径
         * @param url
         */
        push(url: string) {
            uni.navigateTo({
                url: url,
                animationType: 'pop-in',
                animationDuration: 200,
                fail: () => {
                    this.switchTab(url);
                },
            });
        },
        /**
         * 替换新路径
         * @param url
         */
        replace(url: string) {
            uni.redirectTo({
                url: url,
                animationType: 'pop-in',
                animationDuration: 200,
                fail: () => {
                    this.switchTab(url);
                },
            });
        },
        /**
         * 切换选项卡
         * @param url
         */
        switchTab(url: string) {
            uni.switchTab({
                url: url,
            });
        },
    },

    /**
     * 表单验证
     * @param data
     * @param rules
     * @example validate({name: 'zhangsan'}, {name:[{required: true, message: '请填写name'}]}).then(result=>{}).catch(result=>{});
     */
    validate(data: any, rules: any): Promise<ValidateResult> {
        return new Promise((resolve, reject) => {
            const errors: any = {};
            for (let attr in rules) {
                const attrErrors = [];
                for (let rule of rules[attr]) {
                    if (typeof data[attr] === undefined) {
                        attrErrors.push(rule['message'] ?? (attr + ' 不能为空。'));
                        continue;
                    }
                    const value = data[attr];
                    // console.log('validate->', 'attr: ', attr, 'value: ', value, 'rules: ', rule, 'data:', data);
                    if (rule['required'] && !validateRequired(value)) {
                        attrErrors.push(rule['message'] ?? (attr + ' 不能为空。'));
                    }
                    if (rule['pattern'] && !rule['pattern'].test(value)) {
                        attrErrors.push(rule['message'] ?? (attr + ' 格式不正确。'));
                    }
                    if (rule['func']) {
                        rule['func'](value, attr, (error: any) => {
                            if (error instanceof Error) {
                                attrErrors.push(rule['message'] ?? (error.message));
                            }
                        });
                    }
                    if (!data[attr]) {
                        continue;
                    }
                }
                if (attrErrors.length) {
                    errors[attr] = attrErrors;
                }
            }
            let message = '';
            if (!Object.keys(errors).length) {
                return resolve(true);
            }
            for (let attr in errors) {
                if (errors[attr].length) {
                    message = errors[attr][0];
                    break;
                }
            }
            return reject({
                errors,
                message,
            });
        });
    },
};
export default Api;