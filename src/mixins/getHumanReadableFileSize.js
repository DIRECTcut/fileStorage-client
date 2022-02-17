import prettyBytes from "pretty-bytes";
import { toNumber } from "lodash";

export default  {
    methods: {
        getHumanReadableFileSize(bytes) {
            return prettyBytes(toNumber(bytes));
        },
    }
}