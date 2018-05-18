import * as React from "react";

import Heading from 'arui-feather/heading';
import Button from 'arui-feather/button';
import Select from "arui-feather/select";

export const App = () => (
    <div>
        <Heading size='m'>Hello World</Heading>
        <Button size='m' view='extra'>Press me</Button>
        <Select
            size="m"
            mode='radio'
            options={ [
                { value: '01', text: 'ИП Фридман М.М.' },
                { value: '02', text: 'ООО «Виктори»' },
                { value: '03', text: 'ФГУП НПП ВНИИЭМ', props: { disabled: true } }
            ] }
        />
    </div>
);