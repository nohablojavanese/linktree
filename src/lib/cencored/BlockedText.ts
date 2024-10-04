import {
	RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers,
} from 'obscenity';

export const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});


export const BlockedWords = [
    // 'test',
    // 'test2',
    // 'test3',
  ];

