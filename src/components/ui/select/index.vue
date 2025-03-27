<template>
  <div id="select" class="custom-select" @keydown="handleKeydown">
    <input
      v-model="searchQuery"
      @input="onInput"
      @focus="isOpen = true"
      @blur="onBlur"
      :placeholder="props.placeholder"
      ref="inputRef"
      :style="`${props.readonly ? 'cursor: default;' : 'cursor: text;'}`"
      :readonly="props.readonly"
    />
    <MenuDownIcon class="menu"></MenuDownIcon>
    <ul v-if="isOpen && filteredOptions.length" class="options-list">
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        @mousedown="selectOption(option)"
        :class="{
          'option-item': true,
          'is-active': index === highlightedIndex,
        }"
        @mouseenter="highlightedIndex = index"
      >
        <p>
          <slot name="option" :option="option">
            {{ getOptionLabel(option) }}
          </slot>
        </p>
        <div v-if="getOptionValue(option) === props.modelValue" class="checked">
          <CheckMarkIcon></CheckMarkIcon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, type PropType } from "vue";
import { MenuDownIcon, CheckMarkIcon } from "@/components/icons";

interface OptionObject {
  [key: string]: any;
}

type Option = string | OptionObject;

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null] as PropType<Option>,
    required: true,
  },
  options: {
    type: Array as PropType<Option[]>,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  valueKey: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Поиск",
  },
  search: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const searchQuery = ref("");
const isOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const highlightedIndex = ref(-1);
const currentValue = ref<Option | null>(null);

const getOptionLabel = (option: Option): string => {
  if (typeof option === "object" && props.label) {
    return option[props.label];
  }
  return String(option);
};

const getOptionValue = (option: Option): string | number | Option => {
  if (typeof option === "object" && props.valueKey) {
    return option[props.valueKey];
  }
  return option;
};

const filteredOptions = computed(() => {
  if (!props.search || !searchQuery.value) return props.options;
  return props.options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase();
    return label.includes(searchQuery.value.toLowerCase());
  });
});

const onInput = () => {
  isOpen.value = true;
  highlightedIndex.value = -1;
};

const selectOption = (option: Option) => {
  const value = props.valueKey ? getOptionValue(option) : option;
  emit("update:modelValue", value);
  currentValue.value = option;
  searchQuery.value = getOptionLabel(option);
  isOpen.value = false;
};

const onBlur = () => {
  const currentLabel = currentValue.value
    ? getOptionLabel(currentValue.value)
    : "";
  if (!searchQuery.value.trim()) {
    emit("update:modelValue", null);
    currentValue.value = null;
    isOpen.value = false;
    return;
  }
  if (searchQuery.value !== currentLabel) {
    searchQuery.value = currentLabel;
  }
  isOpen.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value || filteredOptions.value.length === 0) return;
  if (event.key === "ArrowDown") {
    event.preventDefault();
    highlightedIndex.value =
      (highlightedIndex.value + 1) % filteredOptions.value.length;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    highlightedIndex.value =
      (highlightedIndex.value - 1 + filteredOptions.value.length) %
      filteredOptions.value.length;
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (highlightedIndex.value >= 0) {
      selectOption(filteredOptions.value[highlightedIndex.value]);
    }
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      const option = props.options.find((o) => {
        return (
          (props.valueKey && getOptionValue(o) === newValue) ||
          (!props.valueKey && o === newValue)
        );
      });
      searchQuery.value = option ? getOptionLabel(option) : "";
      currentValue.value = option || null;
    } else {
      searchQuery.value = "";
      currentValue.value = null;
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.modelValue) {
    const option = props.options.find((o) => {
      return (
        (props.valueKey && getOptionValue(o) === props.modelValue) ||
        (!props.valueKey && o === props.modelValue)
      );
    });
    searchQuery.value = option ? getOptionLabel(option) : "";
    currentValue.value = option || null;
  }
});
</script>

<style scoped lang="scss">
.custom-select {
  position: relative;
  min-width: 100px;
  width: 100%;
  &:focus-within .menu {
    transform: rotate(180deg);
  }
}

.custom-select input {
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: var(--grey);
  padding: 5px 12px;
  padding-right: 32px;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid transparent;
  transition-duration: 200ms;

  &:focus {
    background-color: var(--cards-white);
    border-color: var(--main-primary);
    outline: none;
  }
}
.menu {
  position: absolute;
  top: 9px;
  right: 12px;
  transform: rotate(0deg);
  transition: transform 0.2s ease;
}

.options-list {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--cards-white);
  overflow-y: auto;
  border-radius: 12px;
  max-height: 200px;
  box-shadow: 0px 2px 16px 0px rgba(93, 98, 103, 0.32);
}

.option-item {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  gap: 12px;
  p {
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.option-item:hover,
.option-item.is-active {
  background-color: var(--grey-secondary);
  transition: transform 0.3s ease;
}
.checked {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-primary);
  border-radius: 100%;
  border: none;
  max-width: 15px;
  width: 100%;
  height: 15px;
}
</style>
