export default {
    template: `
        <header class="keep-header-container flex row ">
            <input type="text" placeholder="Search In your keep" @input="onSearch" />
            <select>
                <option>All</option>
                <option>Text</option>
                <option>Images</option>
                <option>Videos</option>
                <option>Todo</option>
            </select>
           
        </header>
    `,
    methods: {
        onSearch(e) {
            this.$emit('search', e.target.value);
            // this.$emit('search', 'hello');
        }
    },
}