import React from 'react';
import { renderer } from '@epam/uui-test-utils';
import { RichTextView } from '../RichTextView';

describe('RichTextView', () => {
    it('should be rendered correctly', () => {
        const tree = renderer
            .create(<RichTextView><p>Test</p></RichTextView>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should be rendered correctly with extra props', () => {
        const tree = renderer
            .create(<RichTextView size="16"><p>Test</p></RichTextView>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});