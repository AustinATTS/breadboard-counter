/** @odoo-module **/

import {Component, whenReady, useState} from "@odoo/owl";
import {mountComponent} from "@web/env";

const DEFAULTS = {
    value: 0, minimum: null, maximum: null, step: 1,
};

const normalizeNumber = (value, fallback = 0) => {
    if (value === null || value === undefined || value === "") {
        return fallback;
    }
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
};

const clamp = (value, minimum, maximum) => {
    if (minimum !== null && minimum !== "" && Number.isFinite(Number(minimum))) {
        value = Math.max(value, Number(minimum));
    }
    if (maximum !== null && maximum !== "" && Number.isFinite(Number(maximum))) {
        value = Math.min(value, Number(maximum));
    }
    return value;
};

const sanitize = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number)) {
        return 0;
    }
    return Math.round(number * 100) / 100;
};

export class App extends Component {
    static template = "breadboard.counter.app";

    setup() {
        this.state = useState({
            counter: this.loadState(), showSettings: false,
        });
    }

    loadState() {
        const raw = localStorage.getItem("breadboard.counter");
        if (!raw) {
            return {
                ...DEFAULTS
            };
        }
        try {
            return {
                ...DEFAULTS, ...JSON.parse(raw),
            };
        } catch {
            return {...DEFAULTS};
        }
    }

    persist() {
        localStorage.setItem("breadboard.counter", JSON.stringify(this.state.counter));
    }

    increment = () => {
        const counter = this.state.counter;
        const step = normalizeNumber(counter.step, 1);
        counter.value = clamp(sanitize(normalizeNumber(counter.value, 0) + step), counter.minimum, counter.maximum);
        this.persist();
    };

    decrement = () => {
        const counter = this.state.counter;
        const step = normalizeNumber(counter.step, 1);
        counter.value = clamp(sanitize(normalizeNumber(counter.value, 0) - step), counter.minimum, counter.maximum);
        this.persist();
    };

    reset = () => {
        this.state.counter.value = 0;
        this.persist();
    };

    fullReset = () => {
        this.state.counter = {
            ...DEFAULTS
        };
        this.persist();
    };

    openSettings = () => {
        this.state.showSettings = true;
    };

    closeSettings = () => {
        const counter = this.state.counter;
        counter.value = normalizeNumber(counter.value, 0);
        counter.step = normalizeNumber(counter.step, 1);
        counter.minimum = counter.minimum === "" ? null : counter.minimum;
        counter.maximum = counter.maximum === "" ? null : counter.maximum;
        counter.value = clamp(counter.value, counter.minimum, counter.maximum);
        this.state.showSettings = false;
        this.persist();
    };

    setValue = (value) => {
        const counter = this.state.counter;
        counter.value = clamp(sanitize(value), Number(counter.minimum), Number(counter.maximum));
        this.persist();
    };
}

whenReady(() => {
    mountComponent(App, document.getElementById("breadboard_counter_root"));
});