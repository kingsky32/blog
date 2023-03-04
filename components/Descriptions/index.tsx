import InternalDescriptions from './Descriptions';
import DescriptionsItem from './Item';

const Descriptions = InternalDescriptions as typeof InternalDescriptions & {
  Item: typeof DescriptionsItem;
};
Descriptions.Item = DescriptionsItem;

export default Descriptions;
