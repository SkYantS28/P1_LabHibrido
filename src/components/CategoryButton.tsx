import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";

type CategoryButtonProps = {
    title: string;
    active?: boolean;
    onPress?: () => void;
};

export default function CategoryButton({
    title,
    active = false,
    onPress,
}: CategoryButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, active && styles.buttonActive]}
            onPress={onPress}>
            <Text style={[styles.text, active && styles.textActive]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        marginRight: 8,
    },

    buttonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    text: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.text,
    },

    textActive: {
        color: COLORS.white,
    },
});
