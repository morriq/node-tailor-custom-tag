import bootstrapRecommendations from 'recommendations';
import bootstrapHeader from 'header';

bootstrapRecommendations();
bootstrapHeader();

if (module.hot) {
    module.hot.accept();
}
