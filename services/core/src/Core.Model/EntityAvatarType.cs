

using System.Runtime.Serialization;

namespace RPGM.Core.Model
{
    public enum EntityAvatarType
    {
        [EnumMember(Value = "none")]
        None,

        [EnumMember(Value = "entityType")]
        EntityType,

        [EnumMember(Value = "custom")]
        Custom,
    }
}